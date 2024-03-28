import { NodeInterface, setType } from "baklavajs";
import CustomImageComponent from "@/components/CustomImageComponent";
// import { ref } from 'vue';

export class CustomImageInterface extends NodeInterface {
  constructor() {
    super("Custom Image Interface", 0);
    this.setComponent(CustomImageComponent);
    this.customClasses = "custom_image";

    this.use(setType, "image");
    // this.imageUrl = ref("https://static.npmjs.com/attachments/ck3uweazy72ye8874y9kkxnx1-gak.png");
  }

  setImageUrl(url) {
    this.imageUrl.value = url;
  }

  render() {
    const componentProps = { imageUrl: this.imageUrl.value };
    return this.getComponent()(componentProps);
  }
}
