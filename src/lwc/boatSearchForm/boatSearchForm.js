/**
 * Created by user on 02.09.2020.
 */
import { LightningElement, track, wire, api } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import getAllBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';

    // Private
    error = undefined;

    // Needs explicit track due to nested data
    @track
    searchOptions = '';

    connectedCallback() {
        console.log('init');
        return getAllBoatTypes();
    }

    // Wire a custom Apex method
    @wire(getAllBoatTypes)
    boatTypes({ error, data }) {
        if (data) {
            this.searchOptions = data.map(type => {
                // TODO: complete the logic
                return {
                    label: type.Name,
                    value: type.Id
                }
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }

    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {

        // Create the const searchEvent
        // searchEvent must be the new custom event search
        const searchEvent = new CustomEvent('search', {'boatTypeId': this.selectedBoatTypeId});
        this.dispatchEvent(searchEvent);
    }
}