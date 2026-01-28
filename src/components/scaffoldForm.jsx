import { useState } from 'react';
import Input from '../shared/ui/input';
import Tag from '../shared/ui/tag';
import RadioButton from '../shared/ui/radioButtons';

function ScaffoldForm() {
    const [scaffoldData, setScaffoldData] = useState({
        name: "",
        fases: [],
        customer: ""
    });


    return (
        <form onSubmit={(e) => e.preventDefault()} className="
            flex flex-col gap-6 w-full max-w-xl
            bg-white
            p-6 sm:p-8 md:p-10
            rounded-2xl shadow-2xl
            backdrop-blur-sm
        ">
            <div className="mb-11">
                <h1 className='text-center text-2xl text-muted'>Rename, compress and generate the best practice Automation Anywhere template</h1>
                <p className='text-center text-xs italic text-muted'>
                    This application is made in order to automate the generation of best practice template,
                    which return a <Tag text={".zip"} /> file that you only have to import in your Control Room
                </p>
            </div>
            <Input placeholder={"Type the name of your project"} onChange={(e) =>
                setScaffoldData(prev => ({ ...prev, name: e.target.value }))
            } value={scaffoldData.name} />

            <RadioButton
                name={"customer"}
                items={[
                    { id: 1, value: "keralty", label: "Keralty" },
                    { id: 2, value: "general-customer", label: "General Customer" }
                ]}
                val={scaffoldData.customer}
                onChange={(e) => setScaffoldData(prev => ({
                    ...prev, customer: e.target.value
                }))}
            />

            <button
                type="button"
                onClick={() => alert("todo: generate the bestpractice template in rust")}
                className="mt-11 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Generate Scaffold Template (.zip)
            </button>
        </form>
    )
}


export default ScaffoldForm;