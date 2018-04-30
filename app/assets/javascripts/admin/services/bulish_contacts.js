import http from './http';

export function all(filters = {}) {
  let url = '/admin/bulish_contacts.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('bulish_contacts[first_name]', model.first_name || '' );
  body.append('bulish_contacts[last_name]', model.last_name || '' );
  body.append('bulish_contacts[email]',  model.email || '' );
  body.append('bulish_contacts[phone]', model.phone || '' );
  body.append('bulish_contacts[message]', model.message || '' );
  body.append('bulish_contacts[skype]', model.skype || '' );

  if(model.id){
    return http.put({ url:`/admin/bulish_contacts/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/bulish_contacts', body })
  }
}

export function show(id){
  return http.get({url:`/admin/bulish_contacts/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/bulish_contacts/${id}`})
}
