import React,{useContext,useEffect,useCallback, useState,useRef} from 'react'
import { Context } from '../utils/Context'
import toast from 'react-hot-toast'
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes'
function Header() {

    let context = useContext(Context)
    let timer
    let [categoryList,setCategoryList] = useState([])
    let searchInput = useRef("")
    let initialRender = useRef(false);
    let getCategories = async()=>{
        try {
            let data = await api.get(ApiRoutes.CATEGORIES.path)
            data.splice(0,0,{slug:"",name:"All",default:true})
            setCategoryList(data)
        } catch (error) {
            toast.error(error.response.data.message || "Error Fetching Category List!")
        }
    }

    let fetchCategoryProducts = useCallback(async(category)=>{
        try {
            context.setIsLoading(true)
            let skip = (context.currentPage-1)*context.itemsPerPage
            let URL = category===""?`${ApiRoutes.SEARCH_PRODUCTS.path}?q=&skip=${skip}&limit=${context.itemsPerPage}`
            :`${ApiRoutes.CATEGORY_SEARCH.path}/${category}?skip=${skip}&limit=${context.itemsPerPage}`
            let data = await api.get(URL)
            context.setProducts(data.products)
            context.setCurrentPage(1)
            context.setTotalCount(data.total)
            context.setIsLoading(false)

        } catch (error) {
            toast.error(error.response.data.message || "Error Fetching Product List!")
        }
    },[context.category])
 
   let fetchSearchedProducts = useCallback(async(query)=>{
    try {
        context.setIsLoading(true)
        context.setCategory("") 
        let skip = (context.currentPage-1)*context.itemsPerPage
        let data = await api.get(`${ApiRoutes.SEARCH_PRODUCTS.path}?q=${query}&skip=${skip}&limit=${context.itemsPerPage}`)
        context.setProducts(data.products)
        context.setCurrentPage(1)
        context.setTotalCount(data.total)
        context.setIsLoading(false)
        
    } catch (error) {
        toast.error(error.response.data.message || "Error Fetching Product List!")
    }
    },[])

    const fetchProduct = async()=>{
          try {
            context.setIsLoading(true)
            let skip = (context.currentPage-1)*context.itemsPerPage
            let URL;
            URL = context.search ? `${ApiRoutes.SEARCH_PRODUCTS.path}?q=${context.search}&skip=${skip}&limit=${context.itemsPerPage}`:`${ApiRoutes.SEARCH_PRODUCTS.path}?q=&skip=${skip}&limit=${context.itemsPerPage}`
            URL = context.category ? `${ApiRoutes.CATEGORY_SEARCH.path}/${context.category}?skip=${skip}&limit=${context.itemsPerPage}`:URL
            let data = await api.get(URL)
            context.setProducts(data.products)
            context.setIsLoading(false)
    
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Error Fetching Product List!")
        }
      }
    
      useEffect(()=>{
        //to avoid calling this twice as we have 2 functions fetching the products
        if(initialRender.current)
            fetchProduct()
        else
            initialRender.current = true
      },[context.currentPage,context.itemsPerPage])
    

    useEffect(()=>{
        getCategories()
    },[])

    useEffect(()=>{
        timer = setTimeout(()=>{
            fetchSearchedProducts(context.search)
        },1000)
        return ()=>clearTimeout(timer)
    },[context.search])

  return <>
    <div className='flex bg-gray-700 h-18 w-screen p-4 flex-row flex-wrap sticky top-0'>
        <div className='text-white text-3xl w-1/4'>
           ShoppingApp
        </div>
        <div className='flex flex-row justify-center w-1/2'>
                <select name="categorySelect" id="categorySelect" onChange={(e)=>{
                    searchInput.current.value=""
                    context.setCurrentPage(1)
                    context.setCategory(e.target.value);
                    fetchCategoryProducts(e.target.value)
                }}
                className='h-12 border border-gray-700 px-2 w-1/4 bg-zinc-300' value={context.category}>
                    {
                        categoryList.map((item,index)=>{
                            return <option value={item.slug} key={index}>{item.name}</option>
                        })
                    }
                </select>

                <input type='text' placeholder='Search Here...' ref={searchInput} onChange={(e)=>{
                    context.setCurrentPage(1)
                    e.target.value!==""?context.setSearch(e.target.value):null}}
                className='h-12 border border-gray-700 p-4 w-3/4'/>
        </div>
    </div>
  </>
}

export default Header