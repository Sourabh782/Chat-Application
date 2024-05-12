import React from 'react'

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex mt-2'>
        <div className='form-control'>
            <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                <input type="checkbox" className='checkbox border-slate-900' checked={selectedGender === "male"} 
                    onChange={()=>onCheckboxChange("male")}
                />
                <span className='label-text'>Male</span>
            </label>
        </div>

        <div className='form-control mx-4'>
            <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                <input type="checkbox" className='checkbox border-slate-900' checked={selectedGender === "female"} 
                    onChange={()=>onCheckboxChange("female")}
                />
                <span className='label-text'>Female</span>
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox