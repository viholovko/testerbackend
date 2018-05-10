json.question do
  json.id @question.id.to_s
  json.question @question.question
  json.type @question.type
  json.order @question.order
  json.additional @question.additional
  json.options @options.each do |option|
    json.id option.id.to_s
    json.text option.text
    json.rate option.rate
  end
end