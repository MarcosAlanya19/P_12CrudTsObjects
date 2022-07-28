import './style.css'

class Product{
  name: string;
  price: number;
  year: number;
  
  constructor(name:string, price:number, year:number){
      this.name = name;
      this.price = price;
      this.year = year;
  }
}

class UI{
  addProduct(product:Product){
    const productList = document.querySelector<HTMLDivElement>('#product-list');
    if (!productList) throw new Error('Product list is not available');
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Product Name</strong>: ${product.name}
          <strong>Product Price</strong>: ${product.price}<strong>Product Year</strong>: ${product.year}
          <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>
      </div>
    `;
    productList.append(element);
  };

  resetForm(){
    form.reset();

  }
  deleteProduct(e:any){
    if(e.name == 'delete'){
      e.parentElement.parentElement.parentElement.remove();
      this.showMessage('Producto eliminado satisfactoriamente', 'info')
    }
  }
  showMessage(message:string,cssClass:string){
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-4`
    div.appendChild(document.createTextNode(message));
    // Mostrando en el DOM
    const container = document.querySelector<HTMLElement>('.container');
    if(!container) throw new Error('No se encontro ningun container')
    const app = document.querySelector<HTMLElement>('#app');
    container.insertBefore(div,app);
    setTimeout(function(){
      document.querySelector<HTMLDivElement>('.alert')?.remove();
    },3000)
  }
}

//DOM Events
const form= document.querySelector<HTMLFormElement>('#productForm')!;
if(!form) throw new Error('No se encontro Form');
const name = document.querySelector<HTMLInputElement>('#name');
if(!name) throw new Error('No se encontro name');
const price = document.querySelector<HTMLInputElement>('#price');
if(!price) throw new Error('No se encontro price');
const year = document.querySelector<HTMLInputElement>('#year');
if(!year) throw new Error('No se encontro year');


form.addEventListener('submit' ,e =>{
  e.preventDefault();

  const nameValue = name.value;
  const priceValue = parseFloat(price.value);
  const yearValue = parseFloat(year.value);

  const product = new Product(nameValue,priceValue,yearValue);
  const ui = new UI ();
  if(nameValue === ''|| priceValue ===  null||  yearValue === null){
    return ui.showMessage('Complete los campos por favor', 'danger');
  }
  // Se agrega el producto
  ui.addProduct(product);
  // Se resetea el formulario
  ui.resetForm();
  // Se manda mensaje
  ui.showMessage('Producto agregado satisfactoriamente', 'success')
})

const productList = document.querySelector<HTMLDivElement>('#product-list');
if (!productList) throw new Error('Product list is not available');
productList.addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
})