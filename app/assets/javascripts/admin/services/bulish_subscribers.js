import http from './http';

export function all(filters = {}) {
  let url = '/admin/bulish_subscribers.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('bulish_subscribers[first_name]', model.first_name || '' );
  body.append('bulish_subscribers[last_name]', model.last_name || '' );
  body.append('bulish_subscribers[email]',  model.email || '' );
  body.append('bulish_subscribers[phone]', model.phone || '' );
  body.append('bulish_subscribers[skype]', model.skype || '' );

  if(model.id){
    return http.put({ url:`/admin/bulish_subscribers/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/bulish_subscribers', body })
  }
}

export function show(id){
  return http.get({url:`/admin/bulish_subscribers/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/bulish_subscribers/${id}`})
}
