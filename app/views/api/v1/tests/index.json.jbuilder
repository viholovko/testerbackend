json.tests @tests.each do |test|
  json.id test.id.to_s
  json.title test.title
  json.description test.description
  json.created_at test.created_at
  json.report_count 0
  json.url 'url'
end
json.count @count
