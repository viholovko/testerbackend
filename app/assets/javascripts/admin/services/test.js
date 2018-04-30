import http from './http';

export function all(filters) {
  let url = '/admin/tests.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('test[title]', model.title || '' );
  body.append('test[status]', model.status || false );

  if(model.id){
    return http.put({ url:`/admin/tests/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/tests', body })
  }
}

export function show(id){
  return http.get({url:`/admin/tests/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/tests/${id}`})
}
