import http from './http';

export function all(filters = {}) {
  let url = '/admin/file_names.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('file_name[name]', model.name || '' );
  body.append('file_name[description]',  model.description || '' );
  body.append('file_name[hash_summa]', model.hash_summa || '' );
  body.append('file_name[archive]', model.archive || false );

  if(model.id){
    return http.put({ url:`/admin/file_names/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/file_names', body })
  }
}

export function show(id){
  return http.get({url:`/admin/file_names/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/file_names/${id}`})
}
