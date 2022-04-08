import { Component, Element, h, VNode, Host, Prop, Method } from "@stencil/core";
import { CSS } from "./resources";
import { HeadingLevel } from "../functional/Heading";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 * @slot - A slot for adding `calcite-list-item` elements.
 */
@Component({
  tag: "calcite-list",
  styleUrl: "list.scss",
  shadow: true
})
export class List implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, disabled prevents user interaction.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListElement;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    const firstListItem: HTMLCalciteListItemElement = this.el.querySelector(
      `calcite-list-item:not([non-interactive])`
    );
    firstListItem?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host role="list">
        <div class={CSS.container}>
          <slot />
        </div>
      </Host>
    );
  }
}
