export default function Label({htmlFor, label}){
  return(
    <>
      <label htmlFor={htmlFor} className="text-blue-950 font-inter font-medium text-base">{label}</label> <span className="text-red-500">*</span>
    </>
  )
}