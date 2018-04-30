import http from './http';

export function all(filters = {}) {
  let url = '/admin/subscribers.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('subscriber[name]', model.name || '' );
  body.append('subscriber[email]',  model.email || '' );
  body.append('subscriber[phone]', model.phone || '' );

  if(model.id){
    return http.put({ url:`/admin/subscribers/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/subscribers', body })
  }
}

export function show(id){
  return http.get({url:`/admin/subscribers/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/subscribers/${id}`})
}
