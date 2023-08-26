
export interface NavbarStyles{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Logo : Attach Image	*/
	logo?: string
	/**	Background Colour : Color	*/
	backgroundcolour?: string
	/**	Searchbar Position : Select	*/
	searchbarposition?: "Left" | "Centre" | "Right"
}