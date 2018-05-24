class Api::V1::RecordsController < Api::V1::BaseController

  skip_before_action :authenticate_user
  before_action :find_record, only: %i[show]

  def index
    page = params[:page].to_i
    page = 1 if page < 1
    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    @count = Record.search_query(params).count
    @record = Record.search_query(params).offset((page - 1) * per_page).limit(per_page)
  end

  def show
  end

  private

  def find_record
    @record = Record.find params[:id]
  end
end
