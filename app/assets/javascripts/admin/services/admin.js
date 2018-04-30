import http from './http';

export function all(filters) {
  let url = '/admin/admins.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('admin[first_name]', model.first_name || '' );
  body.append('admin[email]', model.email || '' );
  body.append('admin[password]', model.password || '' );
  body.append('admin[password_confirmation]', model.password_confirmation || '' );

  if(model.id){
    return http.put({ url:`/admin/admins/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/admins', body })
  }
}

export function show(id){
  return http.get({url:`/admin/admins/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/admins/${id}`})
}
