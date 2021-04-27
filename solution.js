function simplify(poly){
  // identify each monomial with a regex
  let rg = RegExp("([\+-]*)(\\d*)([a-z]+)", "g"), match, polys = {}; 
  while((match = rg.exec(poly)) != null){
    // sort monomial letters
    let mono = match[3].split('').sort().join('');
    // assign order as the value of the key corresponding to the monomial. 0 if key not present, 1 if order is an empty string, handle sign, handle special case if order is '0' 
    polys[mono] = (polys[mono] || 0) + (parseInt(match[2]) || 1 ) * (match[1] == '-' ? -1 : 1) * (parseInt(match[2]) === 0 ? 0 : 1)
  }
  
  // iterate through monomials
  let res = Object.keys(polys)
  .sort((a, b) => b.length == a.length ? a > b : a.length > b.length )
  // ignore 0 order monomials
  .filter(key => polys[key] != 0)
  // render + sign if order is positive, render only - sign if order is -1, do no render order if 1
  .map(key => `${polys[key] > 0 ? '+' : ''}${polys[key] == -1 ? '-' : (polys[key] == 1 ? '' : polys[key])}${key}`)
  .join('')

  // remove head + sign if present
  return res[0] == '+' ? res.slice(1) : res;
}