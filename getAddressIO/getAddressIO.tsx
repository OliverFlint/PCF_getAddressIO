import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as OfficeUI from "office-ui-fabric-react";

export interface IgetAddressIOProps {
    apiKey: string | null,
    onAddressSelected: ((data: any, postcode: string | null) => void),
    onPostCodeUpdated: ((postcode: string | null) => void),
    postcode: string | null
}

export interface IgetAddressIOState {
    postcode: string | null,
    addressResults: OfficeUI.IComboBoxOption[],
    addressComboBoxHidden: boolean,
}

export class getAddressIOComponent extends React.Component<IgetAddressIOProps, IgetAddressIOState> {
    constructor(props: IgetAddressIOProps) {
        super(props);
        this.state = {
            addressComboBoxHidden: true,
            addressResults: [],
            postcode: this.props.postcode
        };
    }

    public searchButton_Click(event: React.MouseEvent<HTMLButtonElement>) {
        let url = "https://api.getAddress.io/find/" + this.state.postcode + "?api-key=" + this.props.apiKey + "&expand=true";
        fetch(url, {
            mode: "cors",
            method: "GET",
        })
            .then(response => {
                return response.json();
            })
            .then((data: any) => {
                let _addressResults: OfficeUI.IComboBoxOption[] = [];
                data.addresses.forEach((adrs: any) => {
                    let o: OfficeUI.IComboBoxOption;
                    o = {
                        text: adrs.formatted_address.join(","),
                        key: JSON.stringify(adrs)
                    };
                    _addressResults.push(o);
                });
                this.setState({
                    addressResults: _addressResults,
                    addressComboBoxHidden: false,
                    postcode: data.postcode
                });
            })
            .catch((error: any) => {
                console.error("Error:", error);
            });
    }

    public postcodeTextField_OnChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
        let val = newValue && newValue !== "" ? newValue : null;
        this.setState({ postcode: val });
        this.props.onPostCodeUpdated(val)
    }

    public addressComboBox_OnChange(event: React.FormEvent<OfficeUI.IComboBox>, option?: OfficeUI.IComboBoxOption) {
        let data = JSON.parse(option ? option.key.toString() : "{}");
        this.props.onAddressSelected(data, this.state.postcode);
    }

    public render(): JSX.Element {
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                        <OfficeUI.TextField
                            id="postcodeTextField"
                            borderless placeholder="--"
                            value={this.state.postcode ? this.state.postcode : ""}
                            onChange={this.postcodeTextField_OnChange.bind(this)} style={{ float: "left" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                        <OfficeUI.IconButton id="searchButton" iconProps={{ iconName: 'Search' }} onClick={this.searchButton_Click.bind(this)} style={{ float: "right" }} />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <OfficeUI.ComboBox
                            id="addressComboBox"
                            placeholder="--"
                            hidden={this.state.addressComboBoxHidden != null ? this.state.addressComboBoxHidden : true}
                            options={this.state.addressResults}
                            onChange={this.addressComboBox_OnChange.bind(this)} style={{ float: "left" }} />
                    </div>
                </div>
            </div >
        )
    }
}