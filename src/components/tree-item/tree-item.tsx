import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import {
  filterDirectChildren,
  getElementDir,
  getSlotted,
  nodeListToArray,
  toAriaBoolean
} from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { CSS_UTILITY } from "../../utils/resources";
import { FlipContext, Scale, SelectionMode } from "../interfaces";
import { TreeItemSelectDetail } from "./interfaces";
import { CSS, ICONS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding text.
 * @slot children - A slot for adding nested `calcite-tree` elements.
 * @slot actions-end - A slot for adding actions to the end of the component. It is recommended to use two or fewer actions.
 */
@Component({
  tag: "calcite-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true
})
export class TreeItem
  implements ConditionalSlotComponent, InteractiveComponent, OpenCloseComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTreeItemElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /** When `true`, the component is expanded. */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** When `true`, the component is selected. */
  @Prop({ mutable: true, reflect: true }) selected = false;

  @Watch("expanded")
  expandedHandler(newValue: boolean): void {
    this.updateParentIsExpanded(this.el, newValue);
    onToggleOpenCloseComponent(this, true);
  }

  /**
   * @internal
   */
  @Prop() parentExpanded = false;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) depth = -1;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) hasChildren: boolean = null;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) lines: boolean;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) scale: Scale;

  /**
   * In ancestor selection mode, show as indeterminate when only some children are selected.
   *
   * @internal
   */
  @Prop({ reflect: true }) indeterminate: boolean;

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) selectionMode: SelectionMode;

  @Watch("selectionMode")
  getselectionMode(): void {
    this.isSelectionMultiLike =
      this.selectionMode === "multiple" || this.selectionMode === "multichildren";
  }

  openTransitionProp = "opacity";

  transitionProp = "expanded";

  /**
   * Specifies element that the transition is allowed to emit on.
   */
  transitionEl: HTMLDivElement;

  /**
   * Defines method for `beforeOpen` event handler.
   */
  onBeforeOpen(): void {
    this.transitionEl.style.transform = "scaleY(1)";
  }

  /**
   * Defines method for `open` event handler:
   */
  onOpen(): void {
    this.transitionEl.style.transform = "none";
  }

  /**
   * Defines method for `beforeClose` event handler:
   */
  onBeforeClose(): void {
    // pattern needs to be defined on how we emit events for components without `open` prop.
  }

  /**
   * Defines method for `close` event handler:
   */
  onClose(): void {
    this.transitionEl.style.transform = "scaleY(0)";
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item");
    if (this.parentTreeItem) {
      const { expanded } = this.parentTreeItem;
      this.updateParentIsExpanded(this.parentTreeItem, expanded);
    }
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  componentWillRender(): void {
    this.hasChildren = !!this.el.querySelector("calcite-tree");
    this.depth = 0;
    let parentTree = this.el.closest("calcite-tree");

    if (!parentTree) {
      return;
    }

    this.selectionMode = parentTree.selectionMode;
    this.scale = parentTree.scale || "m";
    this.lines = parentTree.lines;

    let nextParentTree;
    while (parentTree) {
      nextParentTree = parentTree.parentElement?.closest("calcite-tree");
      if (nextParentTree === parentTree) {
        break;
      } else {
        parentTree = nextParentTree;
        this.depth = this.depth + 1;
      }
    }
  }

  componentWillLoad(): void {
    if (this.expanded) {
      onToggleOpenCloseComponent(this, true);
    }
    requestAnimationFrame(() => (this.updateAfterInitialRender = true));
  }

  componentDidLoad(): void {
    this.updateAncestorTree();
  }

  componentDidRender(): void {
    updateHostInteraction(this, () => this.parentExpanded || this.depth === 1);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private isSelectionMultiLike: boolean;

  render(): VNode {
    const rtl = getElementDir(this.el) === "rtl";
    const showBulletPoint = this.selectionMode === "single" || this.selectionMode === "children";
    const showCheckmark =
      this.selectionMode === "multiple" || this.selectionMode === "multichildren";
    const showBlank = this.selectionMode === "none" && !this.hasChildren;

    const chevron = this.hasChildren ? (
      <calcite-icon
        class={{
          [CSS.chevron]: true,
          [CSS_UTILITY.rtl]: rtl
        }}
        data-test-id="icon"
        icon={ICONS.chevronRight}
        onClick={this.iconClickHandler}
        scale={this.scale === "l" ? "m" : "s"}
      />
    ) : null;
    const defaultSlotNode: VNode = <slot key="default-slot" />;

    const checkbox =
      this.selectionMode === "ancestors" ? (
        <label class={CSS.checkboxLabel} key="checkbox-label">
          <calcite-checkbox
            checked={this.selected}
            class={CSS.checkbox}
            data-test-id="checkbox"
            indeterminate={this.hasChildren && this.indeterminate}
            scale={this.scale}
            tabIndex={-1}
          />
          {defaultSlotNode}
        </label>
      ) : null;
    const selectedIcon = showBulletPoint
      ? ICONS.bulletPoint
      : showCheckmark
      ? ICONS.checkmark
      : showBlank
      ? ICONS.blank
      : null;
    const itemIndicator = selectedIcon ? (
      <calcite-icon
        class={{
          [CSS.bulletPointIcon]: selectedIcon === ICONS.bulletPoint,
          [CSS.checkmarkIcon]: selectedIcon === ICONS.checkmark,
          [CSS_UTILITY.rtl]: rtl
        }}
        icon={selectedIcon}
        scale={this.scale === "l" ? "m" : "s"}
      />
    ) : null;

    const hidden = !(this.parentExpanded || this.depth === 1);
    const isExpanded = this.updateAfterInitialRender && this.expanded;
    const { hasEndActions } = this;
    const slotNode = (
      <slot
        key="actionsEndSlot"
        name={SLOTS.actionsEnd}
        onSlotchange={this.actionsEndSlotChangeHandler}
      />
    );

    const iconStartEl = (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={this.scale === "l" ? "m" : "s"}
      />
    );

    return (
      <Host
        aria-expanded={this.hasChildren ? toAriaBoolean(isExpanded) : undefined}
        aria-hidden={toAriaBoolean(hidden)}
        aria-selected={this.selected ? "true" : showCheckmark ? "false" : undefined}
        calcite-hydrated-hidden={hidden}
        role="treeitem"
      >
        <div class={{ [CSS.itemExpanded]: isExpanded }}>
          <div class={CSS.nodeAndActionsContainer}>
            <div
              class={{
                [CSS.nodeContainer]: true,
                [CSS_UTILITY.rtl]: rtl
              }}
              data-selection-mode={this.selectionMode}
              // eslint-disable-next-line react/jsx-sort-props
              ref={(el) => (this.defaultSlotWrapper = el as HTMLElement)}
            >
              {chevron}
              {itemIndicator}
              {this.iconStart ? iconStartEl : null}
              {checkbox ? checkbox : defaultSlotNode}
            </div>
            <div class={CSS.actionsEnd} hidden={!hasEndActions}>
              {slotNode}
            </div>
          </div>

          <div
            class={{
              [CSS.childrenContainer]: true,
              [CSS_UTILITY.rtl]: rtl
            }}
            data-test-id="calcite-tree-children"
            onClick={this.childrenClickHandler}
            role={this.hasChildren ? "group" : undefined}
            // eslint-disable-next-line react/jsx-sort-props
            ref={(el) => this.setTransitionEl(el)}
          >
            <slot name={SLOTS.children} />
          </div>
        </div>
      </Host>
    );
  }

  setTransitionEl(el: HTMLDivElement): void {
    this.transitionEl = el;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  onClick(event: Event): void {
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren<HTMLAnchorElement>(this.el, "a");
    if (link && (event.composedPath()[0] as any).tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.calciteInternalTreeItemSelect.emit({
      modifyCurrentSelection: this.selectionMode === "ancestors" || this.isSelectionMultiLike,
      forceToggle: false
    });
  }

  iconClickHandler = (event: MouseEvent): void => {
    event.stopPropagation();
    this.expanded = !this.expanded;
  };

  childrenClickHandler = (event: MouseEvent): void => event.stopPropagation();

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    let root;

    switch (event.key) {
      case " ":
        if (this.selectionMode === "none") {
          return;
        }
        this.calciteInternalTreeItemSelect.emit({
          modifyCurrentSelection: this.isSelectionMultiLike,
          forceToggle: false
        });
        event.preventDefault();
        break;
      case "Enter":
        if (this.selectionMode === "none") {
          return;
        }
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find((el) =>
          el.matches("a")
        ) as HTMLAnchorElement;

        if (link) {
          link.click();
          this.selected = true;
        } else {
          this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.isSelectionMultiLike,
            forceToggle: false
          });
        }

        event.preventDefault();
        break;
      case "Home":
        root = this.el.closest("calcite-tree:not([child])") as HTMLCalciteTreeElement;

        const firstNode = root.querySelector("calcite-tree-item");

        firstNode?.focus();

        break;
      case "End":
        root = this.el.closest("calcite-tree:not([child])");

        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find((el) =>
          el.matches("calcite-tree")
        );
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find((el) =>
            el.matches("calcite-tree")
          );
        }
        currentNode?.focus();
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTreeItemSelect: EventEmitter<TreeItemSelectDetail>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /**
   * Used to make sure initially expanded tree-item can properly
   * transition and emit events from closed state when rendered.
   *
   * @private
   */
  @State() updateAfterInitialRender = false;

  childrenSlotWrapper!: HTMLElement;

  defaultSlotWrapper!: HTMLElement;

  private parentTreeItem?: HTMLCalciteTreeItemElement;

  @State() hasEndActions = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateParentIsExpanded = (el: HTMLCalciteTreeItemElement, expanded: boolean): void => {
    const items = getSlotted<HTMLCalciteTreeItemElement>(el, SLOTS.children, {
      all: true,
      selector: "calcite-tree-item"
    });
    items.forEach((item) => (item.parentExpanded = expanded));
  };

  private updateAncestorTree = (): void => {
    if (this.selected && this.selectionMode === "ancestors") {
      const ancestors: HTMLCalciteTreeItemElement[] = [];
      let parent = this.parentTreeItem;
      while (parent) {
        ancestors.push(parent);
        parent = parent.parentElement?.closest("calcite-tree-item");
      }
      ancestors.forEach((item) => (item.indeterminate = true));
      return;
    }
  };

  private actionsEndSlotChangeHandler = (event: Event): void => {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  };
}
