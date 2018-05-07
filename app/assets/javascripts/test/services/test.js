import http from './http';

export function all(filters) {
  let url = '/test/tests.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('test[title]', model.title || '' );
  body.append('test[status]', model.status || false );

  if(model.id){
    return http.put({ url:`/test/tests/${model.id}`, body })
  }else{
    return http.post({ url:'/test/tests', body })
  }
}

export function show(id){
  return http.get({url:`/test/tests/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/test/tests/${id}`})
}
