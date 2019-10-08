import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getAddressIOComponent, IgetAddressIOProps } from "./getAddressIO";
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

export class getAddressIO implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _postcode: string;
	private _line1: string;
	private _line2: string;
	private _line3: string;
	private _line4: string;
	private _locality: string;
	private _towncity: string;
	private _county: string;
	private _country: string;
	private _addressJson: string;
	private _notifyOutputChanged: () => void;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// Add control initialization code
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		
		let props: IgetAddressIOProps = { 
			apiKey: context.parameters.apiKeyProperty.raw,
			onAddressSelected: this.onAddressSelected.bind(this),
			onPostCodeUpdated: this.onPostCodeUpdated.bind(this),
			postcode: context.parameters.postCodeProperty.raw
		}
		ReactDOM.render(React.createElement(getAddressIOComponent, props), container);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
		let props: IgetAddressIOProps = { 
			apiKey: context.parameters.apiKeyProperty.raw,
			onAddressSelected: this.onAddressSelected.bind(this),
			onPostCodeUpdated: this.onPostCodeUpdated.bind(this),
			postcode: context.parameters.postCodeProperty.raw
		}
		ReactDOM.render(React.createElement(getAddressIOComponent, props), this._container);
	}

	public onPostCodeUpdated(postcode: string | null) {
		this._postcode = postcode ? postcode : "";
		this._notifyOutputChanged();
	}

	public onAddressSelected(data: any, postcode: string | null) {
		//
		console.log(data);
		this._postcode = postcode ? postcode : "";
		this._line1 = data.line_1;
		this._line2 = data.line_2;
		this._line3 = data.line_3;
		this._line4 = data.line_4;
		this._locality = data.locality;
		this._towncity = data.town_or_city;
		this._county = data.county;
		this._country = data.country;
		this._addressJson = JSON.stringify(data);
		this._notifyOutputChanged();
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {
			postCodeProperty: this._postcode,
			line1Property: this._line1,
			line2Property: this._line2,
			line3Property: this._line3,
			line4Property: this._line4,
			localityProperty: this._locality,
			towncityProperty: this._towncity,
			countyProperty: this._county,
			countryProperty: this._country,
			addressJSONProperty: this._addressJson
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}