class TinteresController < ApplicationController
  before_action :set_tintere, only: [:show, :edit, :update, :destroy]

  # GET /tinteres
  # GET /tinteres.json
  def index
    @tinteres = Tintere.all
  end

  # GET /tinteres/1
  # GET /tinteres/1.json
  def show
  end

  # GET /tinteres/new
  def new
    @tintere = Tintere.new
  end

  # GET /tinteres/1/edit
  def edit
  end

  # POST /tinteres
  # POST /tinteres.json
  def create
    @tintere = Tintere.new(tintere_params)

    respond_to do |format|
      if @tintere.save
        format.html { redirect_to @tintere, notice: 'Tintere was successfully created.' }
        format.json { render :show, status: :created, location: @tintere }
      else
        format.html { render :new }
        format.json { render json: @tintere.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tinteres/1
  # PATCH/PUT /tinteres/1.json
  def update
    respond_to do |format|
      if @tintere.update(tintere_params)
        format.html { redirect_to @tintere, notice: 'Tintere was successfully updated.' }
        format.json { render :show, status: :ok, location: @tintere }
      else
        format.html { render :edit }
        format.json { render json: @tintere.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tinteres/1
  # DELETE /tinteres/1.json
  def destroy
    @tintere.destroy
    respond_to do |format|
      format.html { redirect_to tinteres_url, notice: 'Tintere was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tintere
      @tintere = Tintere.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tintere_params
      params.require(:tintere).permit(:idinteres, :valor)
    end
end
