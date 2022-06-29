import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "calcite-custom-panel",
  shadow: true
})
export class CustomPanel {
  @Prop()
  menuOpen = false;

  @Prop()
  showBackButton = false;

  @Prop()
  hidden = false;

  render() {
    return (
      // eslint-disable-next-line @esri/calcite-components/ban-props-on-host
      <Host data-custom-panel>
        <calcite-panel
          heading="custom panel"
          hidden={this.hidden}
          menuOpen={this.menuOpen}
          showBackButton={this.showBackButton}
        >
          <img src="https://via.placeholder.com/600x600.png?text=calcite-custom-panel" />
        </calcite-panel>
      </Host>
    );
  }
}
