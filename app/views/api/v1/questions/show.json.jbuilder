json.question do
  json.id @question.id.to_s
  json.question @question.question
  json.type @question.type
  json.order @question.order
  json.options @options.each do |option|
    json.id option.id.to_s
    json.text option.text
  end
end