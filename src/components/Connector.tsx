import { Root, createRoot } from "react-dom/client";
import NewWorldNewRepo from "./NewWorld.tsx";

class Connector {
    root: Root;

    constructor(targetEl: HTMLElement) {
        this.root = createRoot(targetEl);
    }

    render() {
        this.root.render(<NewWorldNewRepo />)
    }
}

export { Connector };
