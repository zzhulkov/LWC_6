/**
 * Created by user on 22.09.2020.
 */

import {LightningElement, api, track} from 'lwc';
/*import selected from '@salesforce/label/c.TILE_WRAPPER_SELECTED_CLASS';
import unselected from '@salesforce/label/c.';*/

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';
export default class BoatTile extends LightningElement {
    @api boat;
    @api selectedBoatId;


    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
        return 'background-image:url(${this.boat.Picture__c})';
    }

    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() {
        if (this.selectedBoatId) {
            if (this.selectedBoatId === this.boat.Id) {
                return TILE_WRAPPER_SELECTED_CLASS;
            }
            return TILE_WRAPPER_UNSELECTED_CLASS;
        }
    }

    // Fires event with the Id of the boat that has been selected.
    selectBoat() {
        this.selectedBoatId = this.boat.Id; //todo comment
        const boatselect = new CustomEvent('boatselect', { detail: { boatId: this.boat.Id } });
        this.dispatchEvent(boatselect);
    }
}