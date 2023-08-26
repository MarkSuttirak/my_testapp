
export interface Blogs{
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
	/**	Title : Data	*/
	title: string
	/**	Content : Text Editor	*/
	content: string
	/**	Image : Attach Image	*/
	blogimage?: string
	/**	Category : Link - Blog Category Section	*/
	category: string
}