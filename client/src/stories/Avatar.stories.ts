import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@/components/Avatar";

const meta: Meta<typeof Avatar> = {
    title: "Components/Avatar",
    component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const InitialsOnly: Story = {
    args: {
        username: "jane",
    },
};

export const WithImage: Story = {
    args: {
        username: "bob",
        src: "/sample-avatar.png",
    },
};

export const Large: Story = {
    args: {
        username: "joe",
        size: 64,
    },
};

export const Small: Story = {
    args: {
        username: "charlie",
        size: 24,
    },
};
