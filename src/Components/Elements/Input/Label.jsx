export default function Label({htmlFor, children}){
  return(
    <>
      <label htmlFor={htmlFor} className="text-blue-950 font-inter font-medium text-md">{children}</label> <span className="text-red-500">*</span>
    </>
  )
}