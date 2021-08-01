export const gmailToUserName = gmail => {
  if (!gmail || gmail.length === 0) return null;
  let ret = '';

  for (let i = 0; i < gmail.length; i++) {
    if (gmail[i] === '@') break;
    ret += gmail[i];
  }

  return ret;
};
