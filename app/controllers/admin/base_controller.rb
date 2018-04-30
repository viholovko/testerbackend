class Admin::BaseController < ApplicationController

  before_action :only_admins

  private

  def only_admins
    render json: { errors: ['You ain\'t admin!'] }, status: :forbidden unless current_user&.role&.name =='admin'
  end

end
