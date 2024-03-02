function check_value(a,b) {
    return a === b;
}

/* 
*/
function is_something(a) {
    return !(check_value(a, null) || check_value(a, undefined));
    
}

