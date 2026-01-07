import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImagePicker } from "@/components/ImagePicker";

const meta: Meta<typeof ImagePicker> = {
    title: "Components/ImagePicker",
    component: ImagePicker,
};

export default meta;

type Story = StoryObj<typeof ImagePicker>;

export const InitialState: Story = {
    args: {
        avatar: { username: "" },
    },
};

export const ReplaceImages: Story = {
    args: {
        avatar: { username: "" },
        initialSrc: "/sample-avatar.png",
    },
};
