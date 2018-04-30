import http from './http';

export function all(filters = {}) {
  let url = '/admin/expert_trade_users.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('expert_trade_user[name]', model.name || '' );
  body.append('expert_trade_user[email]',  model.email || '' );
  body.append('expert_trade_user[phone]', model.phone || '' );
  body.append('expert_trade_user[service]', model.service || '' );

  if(model.id){
    return http.put({ url:`/admin/expert_trade_users/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/expert_trade_users', body })
  }
}

export function show(id){
  return http.get({url:`/admin/expert_trade_users/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/expert_trade_users/${id}`})
}
