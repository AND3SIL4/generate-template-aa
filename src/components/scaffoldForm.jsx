import { useState } from 'react';
import AddPhase from '../shared/addPhase';
import Input from '../shared/ui/input';
import PhaseList from '../shared/ui/listPhases';
import RadioButton from '../shared/ui/radioButtons';
import Tag from '../shared/ui/tag';

const CUSTOMERS = [
    { id: 1, value: "keralty", label: "Keralty" },
    { id: 2, value: "general-customer", label: "General Customer" }
]

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
            rounded-md shadow-2xl
            backdrop-blur-sm
        ">
            {/* Section of the header int the form */}
            <div className="mb-11">
                <h1 className='text-center text-2xl text-muted'>Rename, compress and generate the best practice Automation Anywhere template</h1>
                <p className='text-center text-xs italic text-muted'>
                    This application is made in order to automate the generation of best practice template,
                    which return a <Tag text={".zip"} /> file that you only have to import in your Control Room
                </p>
            </div>

            {/* Section to specify the values to genere the basic template */}
            <Input placeholder={"Type the name of your project"} onChange={(e) =>
                setScaffoldData(prev => ({ ...prev, name: e.target.value }))
            } value={scaffoldData.name} />

            <RadioButton
                name={"customer"}
                items={CUSTOMERS}
                val={scaffoldData.customer}
                onChange={(e) => setScaffoldData(prev => ({
                    ...prev, customer: e.target.value
                }))}
            />

            {/* Show list of phases added */}
            <PhaseList
                fases={scaffoldData.fases}
                onRemove={(index) =>
                    setScaffoldData((prev) => ({
                        ...prev,
                        fases: prev.fases.filter((_, i) => i !== index),
                    }))
                }
            />

            {/* Add phase section */}
            <AddPhase
                onAdd={(phaseName) =>
                    setScaffoldData((prev) => ({
                        ...prev,
                        fases: [...prev.fases, phaseName],
                    }))
                }
            />

            {/* Call to action section */}
            <button
                type="button"
                onClick={() => {
                    alert("todo: generate the bestpractice template in rust")
                    console.log(scaffoldData);
                }}
                className="mt-11 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Generate Scaffold Template (.zip)
            </button>
        </form>
    )
}


export default ScaffoldForm;