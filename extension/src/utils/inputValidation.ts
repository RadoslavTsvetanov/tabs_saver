/* eslint-disable @typescript-eslint/no-explicit-any */
function createValidationFunction(arr_of_values_to_check_for: any[]) {
    return (a: any) => {
        return arr_of_values_to_check_for.includes(a);
    };
}

/* Example usage  


const validationFunction = createValidationConfig([null, "", undefined]);
console.log(validationFunction(null)); // true
console.log(validationFunction("")); // true
console.log(validationFunction(undefined)); // true
console.log(validationFunction("something")); // false


*/


export const validators = {
    is_something: createValidationFunction([null, undefined])
    
}