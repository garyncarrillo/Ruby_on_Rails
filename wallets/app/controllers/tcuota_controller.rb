class TcuotaController < ApplicationController
  before_action :set_tcuotum, only: [:show, :edit, :update, :destroy]

  # GET /tcuota
  # GET /tcuota.json
  def index
    @tcuota = Tcuotum.all
  end

  # GET /tcuota/1
  # GET /tcuota/1.json
  def show
  end

  # GET /tcuota/new
  def new
    @tcuotum = Tcuotum.new
  end

  # GET /tcuota/1/edit
  def edit
  end

  # POST /tcuota
  # POST /tcuota.json
  def create
    @tcuotum = Tcuotum.new(tcuotum_params)

    respond_to do |format|
      if @tcuotum.save
        format.html { redirect_to @tcuotum, notice: 'Tcuotum was successfully created.' }
        format.json { render :show, status: :created, location: @tcuotum }
      else
        format.html { render :new }
        format.json { render json: @tcuotum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tcuota/1
  # PATCH/PUT /tcuota/1.json
  def update
    respond_to do |format|
      if @tcuotum.update(tcuotum_params)
        format.html { redirect_to @tcuotum, notice: 'Tcuotum was successfully updated.' }
        format.json { render :show, status: :ok, location: @tcuotum }
      else
        format.html { render :edit }
        format.json { render json: @tcuotum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tcuota/1
  # DELETE /tcuota/1.json
  def destroy
    @tcuotum.destroy
    respond_to do |format|
      format.html { redirect_to tcuota_url, notice: 'Tcuotum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tcuotum
      @tcuotum = Tcuotum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tcuotum_params
      params.require(:tcuotum).permit(:idcuota, :valor)
    end
end
