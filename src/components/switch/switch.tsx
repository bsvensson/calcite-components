import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  VNode
} from "@stencil/core";
import { focusElement, toAriaBoolean } from "../../utils/dom";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  CheckableFormComponent,
  HiddenFormInputSlot
} from "../../utils/form";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { componentLoaded } from "../../utils/loadable";

@Component({
  tag: "calcite-switch",
  styleUrl: "switch.scss",
  shadow: true
})
export class Switch implements LabelableComponent, CheckableFormComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteSwitchElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @Prop() label: string;

  /** Specifies the name of the component on form submission. */
  @Prop({ reflect: true }) name: string;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /** The component's value. */
  @Prop() value: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  switchEl: HTMLDivElement;

  formEl: HTMLFormElement;

  defaultValue: Switch["checked"];

  defaultChecked: boolean;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this.el);

    focusElement(this.switchEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
    if (!this.disabled && isActivationKey(event.key)) {
      this.toggle();
      event.preventDefault();
    }
  };

  onLabelClick(): void {
    if (!this.disabled) {
      this.toggle();
      this.setFocus();
    }
  }

  private toggle(): void {
    this.checked = !this.checked;
    this.calciteSwitchChange.emit();
  }

  private clickHandler = (): void => {
    this.toggle();
  };

  private setSwitchEl = (el: HTMLDivElement): void => {
    this.switchEl = el;
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the `checked` value has changed.
   */
  @Event({ cancelable: false }) calciteSwitchChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <div
          aria-checked={toAriaBoolean(this.checked)}
          aria-label={getLabelText(this)}
          class="container"
          ref={this.setSwitchEl}
          role="switch"
          tabIndex={0}
        >
          <div class="track">
            <div class="handle" />
          </div>
          <HiddenFormInputSlot component={this} />
        </div>
      </Host>
    );
  }
}
