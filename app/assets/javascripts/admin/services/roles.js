import http from './http';

export function all(filters) {
  let url = '/admin/roles.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('role[name]', model.name || '' );

  if(model.id){
    return http.put({ url:`/admin/roles/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/roles', body })
  }


}

export function show(id){
  return http.get({url:`/admin/roles/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/roles/${id}`})
}
