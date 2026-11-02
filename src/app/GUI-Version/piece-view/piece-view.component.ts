import {
    BindAttribute,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindValue,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./piece-view.component.html";
import css from "./piece-view.component.css";
import { Piece } from "../../../game/elements/Piece";
import { PieceBlueHen } from "../../../game/elements/PieceBlueHen";
import { PieceMinion } from "../../../game/elements/PieceMinion";
import { PieceEvilMinion } from "../../../game/elements/PieceEvilMinion";

export class PieceViewComponent extends WebzComponent {
    // Part B - Step 21
    @BindStyle("image", "background")
    private imageBackgroundColor: string = "green";

    // Part B - Step 22
    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 30;

    // Part B - Step 23
    @BindStyleToNumberAppendPx("image", "padding")
    private padding: number = 10;

    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/images/" + imgName;
    })
    public imgName: string = "blue_hen.png";

    @BindValue("abilities")
    private abilities: string = "Abilities: ";

    constructor(piece: Piece) {
        super(html, css);
        this.setImage(piece);
        this.abilities = piece.getBackpack().toString();
    }

    setImage(piece: Piece) {
        this.imageBackgroundColor = piece.getTeamColor();
        if (piece instanceof PieceBlueHen) {
            this.imgName = "bluehen.png";
        } else if (piece instanceof PieceEvilMinion) {
            this.imgName = "evil-minion.png";
        } else if (piece instanceof PieceMinion) {
            this.imgName = "friendly-minion.png";
        }
    }
}
