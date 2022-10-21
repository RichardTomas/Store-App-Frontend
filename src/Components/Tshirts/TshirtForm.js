import { useState } from 'react';

function TshirtForm({ tshirt: initialTshirt, notify }) {

    const [tshirt, setTshirt] = useState(initialTshirt);
    const isAdd = initialTshirt.tshirtId === 0;

    function handleChange(evt) {
        const clone = { ...tshirt };
        clone[evt.target.name] = evt.target.value;
        setTshirt(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        //this is for the add/update
        const url = "http://localhost:8080/tshirts";
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(tshirt)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return tshirt;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                tshirt: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{tshirt.tshirtId > 0 ? "Edit" : "Add"} Tshirt</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="model">Model</label>
                    <input type="text" id="model" name="model"
                        className="form-control"
                        value={tshirt.model} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input type="text" id="manufacturer" name="manufacturer"
                        className="form-control"
                        value={tshirt.manufacturer} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="memoryAmount">Memory Amount</label>
                    <input type="text" id="memoryAmount" name="memoryAmount"
                        className="form-control"
                        value={tshirt.memoryAmount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="processor">Processor</label>
                    <input type="text" id="processor" name="processor"
                        className="form-control"
                        value={tshirt.processor} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={tshirt.price} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default TshirtForm;