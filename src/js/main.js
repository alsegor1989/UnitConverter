import * as converter from 'units-converter';

window.addEventListener('DOMContentLoaded', () => {

    const unitTypeSelect = document.querySelector("#unit-type");
    const input = document.querySelector("#input");
    const unit = document.querySelector("#unit");

    const fillUnitTypes = () => {
        const unitTypes = {
            acceleration: 'Acceleration',
            angle: 'Angle',
            apparentPower: 'Apparent power',
            area: 'Area',
            charge: 'Charge',
            current: 'Current',
            digital: 'Digital',
            each: 'Each',
            energy: 'Energy',
            force: 'Force',
            frequency: 'Frequency',
            illuminance: 'Illuminance',
            length: 'Length',
            mass: 'Mass',
            pace: 'Pace',
            partsPer: 'Parts-Per',
            power: 'Power',
            pressure: 'Pressure',
            reactiveEnergy: 'Reactive Energy',
            reactivePower: 'Reactive Power',
            speed: 'Speed',
            temperature: 'Temperature',
            time: 'Time',
            voltage: 'Voltage',
            volume: 'Volume',
            volumeFlowRate: 'Volume Flow Rate',
        };
        let options = '';

        for (let type in unitTypes) {
            options += `
                <option label="${unitTypes[type]}">${type}</option>
            `;
        }

        unitTypeSelect.innerHTML = options;

        fillUnits();
    };

    const onUnitSelected = () => {
        fillUnits();
        convert();
    };

    const fillUnits = () => {
        const type = unitTypeSelect.value;
        const unitsList = converter[type]().list();
        let options = '';

        for (let unit of unitsList) {
            options += `
                <option label="${unit.unit} (${unit.singular})">${unit.unit}</option>
            `;
        }

        unit.innerHTML = options;
    };

    const convert = () => {

        const value = input.value;
        const unitValue = unit.value;
        const type = unitTypeSelect.value;
        const output = document.querySelector("#output");
        let result = '';

        // best - the smallest unit with a value above 1
        const best = converter[type](value).from(unitValue).toBest();

        result += `
          <div class="card bg-primary mb-3">
            <div class="card-header" id="card-1">
              <h4>${best.unit} (${best.singular})</h4>
              <div class="fnt-20">${best.value || 0}</div>
            </div>
          </div>
        `;

        // all possible
        const possibilities = converter[type](value).from(unitValue).possibilities();
        for (let possibility of possibilities) {
            const any = converter[type](value).from(unitValue).to(possibility);

            result += `
                <div class="card bg-success mb-3">
                    <div class="card-header" id="card-1">
                    <h4>${any.unit} (${any.singular})</h4>
                    <div class="fnt-20">${any.value || 0}</div>
                    </div>
                </div>
                `;
        }

        output.innerHTML = result;
    };

    fillUnitTypes();

    unitTypeSelect.addEventListener("input", onUnitSelected);
    input.addEventListener("input", convert);
    unit.addEventListener("input", convert);

});