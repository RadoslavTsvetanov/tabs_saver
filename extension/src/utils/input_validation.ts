/* eslint-disable @typescript-eslint/no-explicit-any */
function check_value(a: any,b: any) {
    return a === b;
}

/* 
*/
function is_something<V>(a:V) {
    return !(check_value(a, null) || check_value(a, undefined));
    
}

