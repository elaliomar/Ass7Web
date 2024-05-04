const capitalizeFirstLetter = (title:string | undefined) => {
    if (!title) return title; 
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
export default  capitalizeFirstLetter