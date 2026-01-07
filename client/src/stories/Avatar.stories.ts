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
        username: "Alice",
    },
};

export const WithImage: Story = {
    args: {
        username: "Bob",
        src: "https://i.pravatar.cc/150?img=3",
    },
};

export const Large: Story = {
    args: {
        username: "Charlie",
        size: 64,
    },
};

export const Small: Story = {
    args: {
        username: "Dana",
        size: 24,
    },
};
