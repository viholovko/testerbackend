import http from './http';

export function all(filters = {}) {
  let url = '/admin/emails.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('email[email]', model.email || '' );
  body.append('email[name]', model.name || '' );
  body.append('email[origin]', model.origin || '' );

  if(model.id){
    return http.put({ url:`/admin/emails/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/emails', body })
  }
}

export function show(id){
  return http.get({url:`/admin/emails/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/emails/${id}`})
}
