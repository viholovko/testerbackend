json.files @file_names.each do |file|
  json.id file.id.to_s
  json.name file.name
  json.description file.description
  json.hash_summa file.hash_summa
  json.archive file.archive
  json.rows_count file.rows_count
  json.processed_before file.processed_before
  json.created_at file.created_at.try :strftime, '%d %b %Y %H:%M'
  json.updated_at file.updated_at.try :strftime, '%d %b %Y %H:%M'
end
json.count @count