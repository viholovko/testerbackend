import http from './http';

export function all(filters) {
  let url = '/admin/users.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('user[first_name]', model.first_name || '' );
  body.append('user[last_name]', model.last_name || '' );
  body.append('user[title]', model.title || '' );
  body.append('user[birthday]', model.birthday || '' );

  if(model.id){
    return http.put({ url:`/admin/users/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/users', body })
  }


}

export function show(id){
  return http.get({url:`/admin/users/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/users/${id}`})
}
