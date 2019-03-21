| package |
package := Package name: 'LightsOutGame'.
package paxVersion: 1;
	basicComment: 'Created by Brian Rago for his Shoshana Technologies application. Adapted ever so slightly from the tutorial by Andy Bauer. I changed this string; if that causes issues, it was initially empty.'.


package classNames
	add: #LightsOutBoard;
	add: #LightsOutCell;
	add: #LightsOutCellView;
	add: #LightsOutGame;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: (IdentitySet new
	add: 'Core\Object Arts\Dolphin\Base\Dolphin';
	add: 'Core\Object Arts\Dolphin\MVP\Base\Dolphin MVP Base';
	add: 'Core\Object Arts\Dolphin\MVP\Models\Value\Dolphin Value Models';
	add: 'Core\Object Arts\Dolphin\IDE\Base\Internal Bitmaps and Icons';
	yourself).

package!

"Class Definitions"!

Object subclass: #LightsOutBoard
	instanceVariableNames: 'cells'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Presenter subclass: #LightsOutCell
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Shell subclass: #LightsOutGame
	instanceVariableNames: 'cellPresenters'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
View subclass: #LightsOutCellView
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"Global Aliases"!


"Loose Methods"!

"End of package definition"!

"Source Globals"!

"Classes"!

LightsOutBoard guid: (GUID fromString: '{c237de35-209b-411c-bd89-7cfe0356b2fb}')!
LightsOutBoard comment: ''!
!LightsOutBoard categoriesForClass!Kernel-Objects! !
!LightsOutBoard methodsFor!

cells
	^cells!

setSize: newSize
	cells := (1 to: newSize squared) collect: [:each | true asValue]!

size
	^cells size sqrt truncated! !
!LightsOutBoard categoriesFor: #cells!public! !
!LightsOutBoard categoriesFor: #setSize:!public! !
!LightsOutBoard categoriesFor: #size!public! !

!LightsOutBoard class methodsFor!

defaultSize
	^10!

new
	^self withSize: self defaultSize!

withSize: sideLength
	^super new setSize: sideLength! !
!LightsOutBoard class categoriesFor: #defaultSize!public! !
!LightsOutBoard class categoriesFor: #new!public! !
!LightsOutBoard class categoriesFor: #withSize:!public! !

LightsOutCell guid: (GUID fromString: '{0a101faf-3ce0-43ab-b46b-bcfa0ae7b713}')!
LightsOutCell comment: ''!
!LightsOutCell categoriesForClass!MVP-Presenters! !
!LightsOutCell methodsFor!

toggle
	self model value: self model value not! !
!LightsOutCell categoriesFor: #toggle!public! !

!LightsOutCell class methodsFor!

defaultModel
	^true asValue!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	ViewComposer openOn: (ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 4 788558 10 ##(Smalltalk.STBViewProxy) ##(Smalltalk.LightsOutCellView) 34 12 nil nil 34 2 8 1140850688 1 416 721990 2 ##(Smalltalk.ValueHolder) nil false 1310726 ##(Smalltalk.EqualitySearchPolicy) true nil nil 7 nil nil nil 416 983302 ##(Smalltalk.MessageSequence) 138 144 34 1 721670 ##(Smalltalk.MessageSend) #createAt:extent: 34 2 328198 ##(Smalltalk.Point) 2559 21 658 201 201 416 983302 ##(Smalltalk.WINDOWPLACEMENT) 8 #[44 0 0 0 0 0 0 0 1 0 0 0 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 4 0 0 10 0 0 0 99 5 0 0 110 0 0 0] 8 #() 658 193 193 nil 27 )! !
!LightsOutCell class categoriesFor: #defaultModel!public! !
!LightsOutCell class categoriesFor: #resource_Default_view!public!resources-views! !

LightsOutGame guid: (GUID fromString: '{ca9b1991-f0be-4bf3-9e44-600609446384}')!
LightsOutGame comment: ''!
!LightsOutGame categoriesForClass!MVP-Presenters! !
!LightsOutGame methodsFor!

clearExistingCellPresenters
	cellPresenters do: [:each|
		each destroy
	]!

createCellPresenters
	self clearExistingCellPresenters.
	self view layoutManager rows: self model size.
	self model cells do: [:eachCell|
		|cp|
		cp := LightsOutCell createIn: self on: eachCell.
		cellPresenters add: cp.
		cp when: #cellAction perform: [
			self toggleDiagonalsOf: cp.
		]
	]!

diagonalsOf: aLightsOutCell
	|cpRect|
	cpRect := aLightsOutCell view rectangle.
	^cellPresenters select: [:each|
		|eachRect|
		eachRect := each view rectangle.
		(eachRect topRight = cpRect bottomLeft)
		| (eachRect topLeft = cpRect bottomRight)
		| (eachRect bottomRight = cpRect topLeft)
		| (eachRect bottomLeft = cpRect topRight)
	]!

initialize
	super initialize.
	cellPresenters := OrderedCollection new!

model: aLightsOutGameBoard
	super model: aLightsOutGameBoard.
	self hasView ifTrue: [
		self createCellPresenters
	]!

neighborsOf: aLightsOutCell 
	|cpRect|
	cpRect := aLightsOutCell view rectangle.
	^cellPresenters select: [:each|
		|eachRect|
		eachRect := each view rectangle.
		(eachRect rightCenter = cpRect leftCenter)
		| (eachRect leftCenter = cpRect rightCenter)
		| (eachRect topCenter = cpRect bottomCenter)
		| (eachRect bottomCenter = cpRect topCenter)
	]!

onViewOpened
	super onViewOpened.
	self createCellPresenters!

toggleDiagonalsOf: aLightsOutCell
	(self diagonalsOf: aLightsOutCell) do: [:eachCell|
		eachCell toggle
	]!

toggleNeighborsOf: aLightsOutCell 
	(self neighborsOf: aLightsOutCell) do: [:eachCell|
		eachCell toggle
	]! !
!LightsOutGame categoriesFor: #clearExistingCellPresenters!public! !
!LightsOutGame categoriesFor: #createCellPresenters!public! !
!LightsOutGame categoriesFor: #diagonalsOf:!public! !
!LightsOutGame categoriesFor: #initialize!public! !
!LightsOutGame categoriesFor: #model:!public! !
!LightsOutGame categoriesFor: #neighborsOf:!public! !
!LightsOutGame categoriesFor: #onViewOpened!public! !
!LightsOutGame categoriesFor: #toggleDiagonalsOf:!public! !
!LightsOutGame categoriesFor: #toggleNeighborsOf:!public! !

!LightsOutGame class methodsFor!

defaultModel
	^LightsOutBoard new!

icon

	"Generated from:
	self createIconMethod: #icon ofSize: 48@48 fromFile: 'C:\Users\brian\Pictures\Saved Pictures\StuffEdited\lights_out.png'.
	"
	^InternalIcon fromBytes: #[137 80 78 71 13 10 26 10 0 0 0 13 73 72 68 82 0 0 0 48 0 0 0 48 8 6 0 0 0 87 2 249 135 0 0 0 1 115 82 71 66 0 174 206 28 233 0 0 0 4 103 65 77 65 0 0 177 143 11 252 97 5 0 0 0 9 112 72 89 115 0 0 14 195 0 0 14 195 1 199 111 168 100 0 0 4 253 73 68 65 84 104 67 237 90 207 107 93 69 20 30 122 75 250 203 52 52 132 46 82 2 145 180 8 129 86 105 55 22 67 36 36 193 70 17 66 19 107 75 32 98 109 67 209 212 180 90 77 211 26 37 54 53 70 105 212 128 74 161 218 36 118 209 90 197 226 162 130 45 161 130 224 74 116 35 117 37 116 211 141 27 193 63 224 120 190 201 187 195 55 147 17 134 219 215 60 10 239 194 247 152 249 56 231 123 115 222 61 115 207 204 157 103 58 231 59 101 124 113 220 161 101 182 69 178 254 76 178 46 194 169 76 70 126 24 113 54 104 131 243 108 212 7 190 172 213 49 215 97 193 92 57 245 49 118 115 230 167 51 194 87 231 130 146 15 27 49 134 112 204 200 157 127 238 148 44 196 182 193 121 54 234 3 95 190 38 110 77 88 240 85 78 125 140 189 26 128 67 165 2 216 54 187 77 186 22 186 28 234 167 235 197 12 169 195 32 225 45 35 109 95 182 57 27 180 193 121 54 234 3 95 214 106 249 164 197 130 185 114 234 99 236 102 224 219 1 185 246 231 53 135 29 159 239 16 211 174 14 143 16 222 80 236 164 190 182 55 127 184 217 243 179 191 198 17 178 1 250 140 28 248 230 128 103 7 125 216 50 7 173 20 125 248 50 135 177 39 167 144 169 163 190 182 155 63 110 46 121 44 93 139 127 45 46 253 82 236 247 164 137 166 16 108 249 130 86 138 126 52 133 170 1 148 174 138 5 176 254 236 122 217 56 181 209 97 245 187 171 197 156 86 145 49 194 59 138 83 212 215 246 170 137 85 158 223 134 179 27 196 188 77 54 128 78 196 53 147 107 60 59 232 195 150 57 104 165 232 195 151 57 140 221 100 79 101 98 30 82 167 28 47 26 185 250 199 85 185 251 239 93 135 166 153 38 49 141 100 131 246 107 212 7 90 21 234 235 113 221 37 48 7 27 216 50 7 173 64 31 223 201 99 192 152 218 46 182 121 220 232 141 81 13 160 67 3 224 219 174 105 144 114 139 99 207 233 88 10 89 48 7 155 130 41 26 77 161 7 63 128 103 52 128 6 117 202 241 146 145 185 223 230 228 246 223 183 29 182 156 219 34 166 153 108 208 198 109 103 191 199 20 234 235 113 61 37 48 7 27 216 50 7 173 64 31 223 201 99 192 152 118 127 177 219 227 176 232 51 245 239 215 75 211 71 77 14 107 39 215 46 21 174 227 4 76 206 215 169 143 54 56 182 129 15 170 39 115 58 33 235 166 234 10 233 99 194 178 159 45 118 129 62 86 172 133 31 163 169 41 148 186 22 74 73 161 80 223 166 127 53 128 28 149 10 160 255 235 126 153 255 125 222 161 245 211 86 49 93 106 240 40 225 77 197 227 212 71 27 28 219 192 231 229 128 123 222 200 222 203 123 11 233 55 124 208 224 249 157 188 113 114 153 126 182 95 3 216 254 217 118 233 187 210 231 128 201 210 126 177 221 227 80 241 122 46 245 184 62 218 224 216 6 62 240 101 14 131 5 152 75 213 183 171 129 125 4 20 64 76 126 226 178 225 255 73 161 88 29 8 55 28 41 207 105 164 79 234 90 40 101 67 147 60 7 170 1 148 174 21 9 96 207 87 123 100 250 231 105 135 173 179 91 101 232 251 33 143 219 52 189 73 198 110 142 185 62 218 224 216 6 62 240 101 174 123 161 219 130 185 84 125 51 170 131 124 130 240 172 226 85 159 203 94 208 0 178 33 253 120 90 137 28 90 214 123 47 247 202 240 245 97 135 218 169 90 49 189 100 131 54 150 189 236 183 95 129 37 1 115 135 75 96 14 54 176 101 14 90 129 62 190 147 199 128 49 133 250 118 236 246 54 208 109 193 109 138 221 226 162 117 160 156 139 185 104 10 85 3 200 81 177 0 80 12 168 56 160 88 196 10 141 25 32 27 180 19 10 141 121 165 4 230 96 3 91 230 160 21 232 199 10 101 180 144 217 114 76 229 217 150 235 130 75 9 84 93 46 255 88 70 96 57 225 217 169 62 150 5 108 135 101 195 204 47 51 174 143 118 108 41 17 234 99 25 20 77 161 148 91 28 75 161 88 29 136 165 80 44 69 139 212 25 212 176 106 0 14 21 11 0 219 50 218 166 217 109 27 38 11 115 137 91 74 108 23 121 27 136 237 164 45 82 108 167 250 88 145 178 29 182 143 141 231 26 93 31 237 216 150 50 212 199 118 184 172 155 250 112 211 125 244 250 209 251 191 169 47 103 29 72 77 161 148 20 189 167 57 240 96 5 80 198 87 139 225 171 191 19 63 158 88 129 87 139 227 26 0 38 90 14 157 156 177 151 175 181 239 213 186 62 218 246 133 47 251 105 53 13 95 190 226 197 174 125 40 176 29 38 127 228 229 113 168 159 242 242 216 142 61 53 133 194 199 92 185 83 40 229 49 106 125 201 207 142 189 26 64 142 138 5 240 156 126 240 193 220 17 99 103 55 31 166 161 136 92 248 245 130 235 163 109 139 29 251 181 155 101 135 112 56 224 195 65 159 103 135 131 192 200 33 98 168 143 239 100 45 251 196 9 14 17 237 216 179 99 250 129 200 114 96 47 26 57 6 53 7 169 143 54 56 182 129 15 124 153 27 49 133 143 89 215 77 174 243 252 118 157 223 181 76 223 142 61 150 66 177 91 156 82 7 172 47 115 154 62 72 35 190 144 102 247 125 14 84 3 200 177 18 1 212 28 170 241 255 214 114 124 233 175 45 30 135 191 190 232 162 207 245 209 142 252 29 198 250 50 119 48 43 252 119 27 204 21 246 27 252 110 112 153 126 205 161 26 249 15 111 118 58 113 18 168 93 180 0 0 0 0 73 69 78 68 174 66 96 130]!

initialize
	"
	self initialize
	"
	Smalltalk developmentSystem addSamplesFolderIconFor: self description: 'Lights Out Game'!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	ViewComposer openOn: (ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 4 788558 10 ##(Smalltalk.STBViewProxy) ##(Smalltalk.ShellView) 34 27 nil nil 8 #(13303808 65536) 416 nil 786694 ##(Smalltalk.IndexedColor) 33554437 nil 39 nil nil nil 416 656390 ##(Smalltalk.GridLayout) 3 1 1 1 170 192 8 #() nil nil nil nil nil 1 nil nil nil nil 1 nil nil 983302 ##(Smalltalk.MessageSequence) 138 144 34 3 721670 ##(Smalltalk.MessageSend) #createAt:extent: 34 2 328198 ##(Smalltalk.Point) 2559 21 674 1001 1001 416 626 #text: 34 1 8 'Lights Out' 416 626 #updateMenuBar 544 416 983302 ##(Smalltalk.WINDOWPLACEMENT) 8 #[44 0 0 0 0 0 0 0 0 0 0 0 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 4 0 0 10 0 0 0 243 6 0 0 254 1 0 0] 8 #() 674 193 193 nil 27 )!

uninitialize
	Smalltalk developmentSystem removeSystemFolderIconNamed: 'Lights Out Game'! !
!LightsOutGame class categoriesFor: #defaultModel!public! !
!LightsOutGame class categoriesFor: #icon!constants!public! !
!LightsOutGame class categoriesFor: #initialize!public! !
!LightsOutGame class categoriesFor: #resource_Default_view!public!resources-views! !
!LightsOutGame class categoriesFor: #uninitialize!public! !

LightsOutCellView guid: (GUID fromString: '{60d50f6c-e608-440d-b916-f9e5006dc80c}')!
LightsOutCellView comment: ''!
!LightsOutCellView categoriesForClass!MVP-Resources-Misc! !
!LightsOutCellView methodsFor!

colorWhenOff
	^Color black!

colorWhenOn
	^Color white!

connectModel
	self model when: #valueChanged send: #invalidate to: self!

onLeftButtonReleased: aMouseEvent
	self presenter trigger: #cellAction!

onPaintRequired: aPaintEvent
	self model value
		ifTrue: [
			|cellRect canvas|
			cellRect := self clientRectangle insetBy: 5.
			canvas := aPaintEvent canvas.
			canvas fillRectangle: cellRect color: self colorWhenOn
		]
		ifFalse: [
			|cellRect canvas|
			cellRect := self clientRectangle insetBy: 5.
			canvas := aPaintEvent canvas.
			canvas fillRectangle: cellRect color: self colorWhenOff
		]! !
!LightsOutCellView categoriesFor: #colorWhenOff!public! !
!LightsOutCellView categoriesFor: #colorWhenOn!public! !
!LightsOutCellView categoriesFor: #connectModel!public! !
!LightsOutCellView categoriesFor: #onLeftButtonReleased:!public! !
!LightsOutCellView categoriesFor: #onPaintRequired:!public! !

!LightsOutCellView class methodsFor!

defaultModel
	^true asValue!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	ViewComposer openOn: (ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 4 788558 10 ##(Smalltalk.STBViewProxy) ##(Smalltalk.LightsOutCellView) 34 12 nil nil 34 2 8 1140850688 1 416 721990 2 ##(Smalltalk.ValueHolder) nil false 1310726 ##(Smalltalk.EqualitySearchPolicy) true 524550 ##(Smalltalk.ColorRef) 8 4278190080 nil 5 nil nil nil 416 983302 ##(Smalltalk.MessageSequence) 138 144 34 1 721670 ##(Smalltalk.MessageSend) #createAt:extent: 34 2 328198 ##(Smalltalk.Point) 1 1 706 201 201 416 983302 ##(Smalltalk.WINDOWPLACEMENT) 8 #[44 0 0 0 0 0 0 0 0 0 0 0 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 0 0 0 0 0 0 0 0 100 0 0 0 100 0 0 0] 8 #() 706 193 193 nil 27 )! !
!LightsOutCellView class categoriesFor: #defaultModel!public! !
!LightsOutCellView class categoriesFor: #resource_Default_view!public!resources-views! !

"Binary Globals"!

