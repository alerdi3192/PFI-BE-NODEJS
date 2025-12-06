import { db } from "../data/data.js";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

function obtenerProducto(id) {
  return new Promise (async(res, rej) => {
    try{
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document ID:", docSnap.id);
        console.log("Document data:", docSnap.data());
        res(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch(error){
      console.log(error);
    }
  });
};

// obtenerProducto(id);


function obtenerProductos() {
  return(
    new Promise(async (res, rej) => {
      try{
        const querySnapshot = await getDocs(collection(db, "products"));
        const productos = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          productos.push({...doc.data(), id: doc.id});
        });
        console.log(productos);
        res(productos)
      } catch(error) {
        console.log(error);
        rej(error);
      }      
    })
  )
};

obtenerProductos();

function agregarProducto(producto) {
  // Add a new document in collection "products"
  return(
    new Promise(async (res, rej) => {
      try {
        const docRef = await addDoc(collection(db, "products"), producto);
        console.log("Doc ID:", docRef.id, "Producto: ");
        res({...producto, id: docRef.id});
      } catch(error) {
        console.log(error);
        rej(error);
      }
    })
  )
};

// agregarProducto({nombre: "yerba", categoria: "infusion", precio: 200});


function actualizarProducto(producto) {
  return(
    new Promise(async (res, rej) => {      
      try {
        await updateDoc(doc(db, "products", producto.id), {
          precio: producto.precio
        });
        console.log("Producto actualizado")
        res()
      } catch(error) {
        console.log(error)
        rej(error)
      };
    })
  )
};

// actualizarProducto({id: "jntUhiB37Bwl8Bz5dMR3", precio: 220});


function eliminarProducto(id) {
  return(
    new Promise(async (res, rej) => {      
      try {
        await deleteDoc(doc(db, "products", id));
        console.log("Producto eliminado");
        res()
      } catch (error) {
        console.log(error)
        rej(error)
      };
    })
  )
};

// eliminarProducto("jntUhiB37Bwl8Bz5dMR3");