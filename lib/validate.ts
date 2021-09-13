export function validateUrl(url: string) {
  return !!url.match(
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  );
}

export function validateShortId(id: string) {
  return !!id.match(/^(\w|-)+$/);
}
