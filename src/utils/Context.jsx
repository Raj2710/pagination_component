import React,{useState,useEffect} from 'react'
import ApiRoutes from './ApiRoutes'
import toast from 'react-hot-toast'
export const Context = React.createContext()
function ContextProvider({children}) {
  const [products,setProducts] = useState([])
  const [category,setCategory] = useState("")
  const [currentPage,setCurrentPage] = useState(1)
  const [totalCount,setTotalCount] = useState(0)
  const [search,setSearch] = useState("")
  const [isLoading,setIsLoading] = useState(true)
  const [itemsPerPage,setItemsPerPage] = useState(10)

  return <Context.Provider value={
    {
      products,
      setProducts,
      currentPage,
      setCurrentPage,
      totalCount,
      setTotalCount,
      category,
      setCategory,
      itemsPerPage,
      setItemsPerPage,
      search,
      setSearch,
      isLoading,
      setIsLoading
    }}
      >
    {children}
  </Context.Provider>
}

export default ContextProvider